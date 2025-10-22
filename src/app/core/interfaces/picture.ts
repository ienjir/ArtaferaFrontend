export interface Picture {
  id: number
  created_at: string
  updated_at: string
  name: string
  priority?: number
  is_public: boolean
  type: string
}
